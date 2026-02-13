export const getAdminAnalytics = async (req, res) => {
  try {
    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 5);

    // 1️⃣ Monthly user growth
    const monthlyGrowth = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    // 2️⃣ Role distribution
    const roleDistribution = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);

    // 3️⃣ Pending approvals
    const pendingRequests = await User.find({
      roleStatus: "pending",
    }).select("name email requestedRole createdAt");

    // 4️⃣ Approval history
    const approvalHistory = await User.find({
      roleStatus: { $in: ["approved", "rejected"] },
      approvedBy: { $ne: null },
    })
      .populate("approvedBy", "name")
      .select("name email role approvedAt");

    return res.json({
      status: "success",
      data: {
        monthlyGrowth,
        roleDistribution,
        pendingRequests,
        approvalHistory,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Analytics failed" });
  }
};
