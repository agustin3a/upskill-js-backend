const { Account } = require("../../models");

module.exports = {
  async updateBalance(uid, accountId, amount) {
    let payload = { status: false };
    try {
      // Get account
      let account = await Account.findOne({
        where: {
          user_id: uid,
          id: accountId,
          active: true,
        },
      });
      if(account == null) throw new Error("Account not found");
      // Update balance
      account.balance = account.balance + amount;
      await account.save();
      payload = { status: true, account };
    } catch (err) {
      console.log(err);
      payload = { status: false, message: err.message };
    }
    return payload;
  },
};
