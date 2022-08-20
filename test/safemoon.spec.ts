import { Wallet } from "ethers";
import { ethers, waffle } from "hardhat";
import { fixture } from "./utils/fixture";
import { ISafemoon, OldSafemoon, Safemoon } from "../typechain";
import { expect } from "chai";
import { beautifyObject } from "./utils/utils";
import { parseEther } from "ethers/lib/utils";

describe("Safemoon", () => {
  let wallets: Wallet[];
  let deployer: Wallet;
  let account1: Wallet;
  let safemoon: ISafemoon & Safemoon;
  let oldSafemoon: ISafemoon & OldSafemoon;
  let loadFixture: ReturnType<typeof waffle.createFixtureLoader>;

  before("create fixture loader", async () => {
    wallets = await (ethers as any).getSigners();
    deployer = wallets[0];
    account1 = wallets[1];
  });

  beforeEach(async () => {
    loadFixture = waffle.createFixtureLoader(wallets as any);
    ({ safemoon, oldSafemoon } = await loadFixture(fixture));

    for (let i = 0; i < 20; i++) {
      await safemoon.excludeFromReward(ethers.Wallet.createRandom().address);
      await oldSafemoon.excludeFromReward(ethers.Wallet.createRandom().address);
    }
  });

  const printBalanceOfAddress = async (safemoonInstance: ISafemoon, address: string) => {
    console.log("\x1b[36m%s\x1b[0m", "============= START printBalanceOfAddress =============");
    console.log("\x1b[36m%s\x1b[0m", "address", address);

    const balance = await safemoonInstance.balanceOf(address);
    console.log("\x1b[36m%s\x1b[0m", "balance", ethers.utils.formatEther(balance), "ethers");

    console.log("\x1b[36m%s\x1b[0m", "============= STOP printBalanceOfAddress =============");
  };

  it("transfer from exclude to non-exclude wallet", async () => {
    // add deployer to exclude
    await safemoon.excludeFromReward(deployer.address);
    await oldSafemoon.excludeFromReward(deployer.address);

    const acc1SFMBalance = await safemoon.balanceOf(account1.address);
    const acc1OldSFMBalance = await oldSafemoon.balanceOf(account1.address);
    expect(acc1SFMBalance).eq(0);
    expect(acc1OldSFMBalance).eq(0);

    // est gas limit
    const gasLimit = await safemoon.estimateGas.transfer(account1.address, parseEther("10"));
    const oldGasLimit = await oldSafemoon.estimateGas.transfer(account1.address, parseEther("10"));
    console.log("\x1b[36m%s\x1b[0m", "gasLimit", gasLimit.toString());
    console.log("\x1b[36m%s\x1b[0m", "oldGasLimit", oldGasLimit.toString());

    await safemoon.transfer(account1.address, parseEther("10"));
    await oldSafemoon.transfer(account1.address, parseEther("10"));
    const acc1SFMBalance01 = await safemoon.balanceOf(account1.address);
    const acc1OldSFMBalance01 = await oldSafemoon.balanceOf(account1.address);
    const deployerSFMBalance01 = await safemoon.balanceOf(deployer.address);
    const deployerOldSFMBalance01 = await oldSafemoon.balanceOf(deployer.address);

    expect(acc1OldSFMBalance01).eq(acc1SFMBalance01);
    expect(deployerSFMBalance01).eq(deployerOldSFMBalance01);
  });

  it("transfer from non-exclude to exclude wallet", async () => {
    // add deployer to exclude
    await safemoon.excludeFromReward(account1.address);
    await oldSafemoon.excludeFromReward(account1.address);

    const acc1SFMBalance = await safemoon.balanceOf(account1.address);
    const acc1OldSFMBalance = await oldSafemoon.balanceOf(account1.address);
    expect(acc1SFMBalance).eq(0);
    expect(acc1OldSFMBalance).eq(0);

    // est gas limit
    const gasLimit = await safemoon.estimateGas.transfer(account1.address, parseEther("10"));
    const oldGasLimit = await oldSafemoon.estimateGas.transfer(account1.address, parseEther("10"));
    console.log("\x1b[36m%s\x1b[0m", "gasLimit", gasLimit.toString());
    console.log("\x1b[36m%s\x1b[0m", "oldGasLimit", oldGasLimit.toString());

    await safemoon.transfer(account1.address, parseEther("10"));
    await oldSafemoon.transfer(account1.address, parseEther("10"));
    const acc1SFMBalance01 = await safemoon.balanceOf(account1.address);
    const acc1OldSFMBalance01 = await oldSafemoon.balanceOf(account1.address);
    const deployerSFMBalance01 = await safemoon.balanceOf(deployer.address);
    const deployerOldSFMBalance01 = await oldSafemoon.balanceOf(deployer.address);

    expect(acc1OldSFMBalance01).eq(acc1SFMBalance01);
    expect(deployerSFMBalance01).eq(deployerOldSFMBalance01);
  });
});
