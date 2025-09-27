const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AuthModule", (m) => {
  const v = m.contract("ZKAuth");

  return { v };
});
