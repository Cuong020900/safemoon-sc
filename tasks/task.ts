import { parseEther } from "ethers/lib/utils";
import { task } from "hardhat/config";
import { Safemoon__factory } from "typechain";

task("exclude-wallet", "exclude wallet", async function (_taskArgs, hre) {
  const { ethers } = hre;
  const [deployer] = await ethers.getSigners();

  const safemoon = await Safemoon__factory.connect("0x273FF27A79830b2a7876618cFB207a0E33d29E15", deployer);

  for (let i = 0; i < 20; i++) {
    const tx = await safemoon.excludeFromReward(ethers.Wallet.createRandom().address);
    console.log("\x1b[36m%s\x1b[0m", "tx", tx);
    await tx.wait();
  }
  console.log("\x1b[36m%s\x1b[0m", "done");
});

task("exclude-wallet", "exclude wallet", async function (_taskArgs, hre) {
  const { ethers } = hre;
  const [deployer] = await ethers.getSigners();

  const safemoon = await Safemoon__factory.connect("0x273FF27A79830b2a7876618cFB207a0E33d29E15", deployer);

  // transfer to 9 wallet
  for (let i = 0; i < 9; i++) {
    const tx = await safemoon.transfer(ethers.Wallet.createRandom().address, parseEther("10"));
    await tx.wait();
  }

  // exclude 29 wallet
  for (let i = 0; i < 20; i++) {
    const tx = await safemoon.excludeFromReward(ethers.Wallet.createRandom().address);
    await tx.wait();
  }
  console.log("\x1b[36m%s\x1b[0m", "done");
});
