import { Wallet } from "ethers";
import { ethers, waffle } from "hardhat";
import { fixture } from "./utils/fixture";
import { SafeswapRouter, WETH9 } from "../typechain";
import { expect } from "chai";
import { beautifyObject } from "./utils/utils";
import { parseEther, parseUnits } from "ethers/lib/utils";

describe("Safemoon", () => {
  let wallets: Wallet[];
  let deployer: Wallet;
  let account1: Wallet;
  let account2: Wallet;
  let account3: Wallet;
  let router: SafeswapRouter;
  let weth: WETH9;
  let loadFixture: ReturnType<typeof waffle.createFixtureLoader>;
  const zeroAddr = ethers.constants.AddressZero;

  before("create fixture loader", async () => {
    wallets = await (ethers as any).getSigners();
    deployer = wallets[0];
    account1 = wallets[1];
    account2 = wallets[2];
    account3 = wallets[3];
  });

  beforeEach(async () => {
    loadFixture = waffle.createFixtureLoader(wallets as any);
    ({ router, weth } = await loadFixture(fixture));
  });

  it("test", async () => {
    const OldSafemoon = await ethers.getContractFactory("OldSafemoon");
    const NewSafemoon = await ethers.getContractFactory("Safemoon");
    const oldSafemoon = await OldSafemoon.deploy();

    const Proxy = await ethers.getContractFactory("Proxy");
    const proxy = await Proxy.deploy(oldSafemoon.address);

    const oldSafemoonInstance = await OldSafemoon.attach(proxy.address);
    await oldSafemoonInstance.initialize(router.address);
    const newSafemoonInstance = await NewSafemoon.attach(proxy.address);

    console.log("\x1b[36m%s\x1b[0m", "------------------------------");
    // setup tax tiers
    await oldSafemoonInstance.whitelistAddress(router.address, 1);
    console.log("\x1b[36m%s\x1b[0m", "------------------------------");
    const tier = await oldSafemoonInstance.accountTier(router.address);
    console.log("=========================================>  tierrrrrrrrrrr : " + tier);

    // transfer token to 5-10 addresses
    for (let i = 0; i < 10; i++) {
      await oldSafemoonInstance.transfer(ethers.Wallet.createRandom().address, parseEther("10"));
    }

    // exclude 10-20 wallets
    for (let i = 0; i < 20; i++) {
      await oldSafemoonInstance.excludeFromReward(ethers.Wallet.createRandom().address);
    }

    // from here, we will use newSafemoonInstance

    // console.log("\x1b[36m%s\x1b[0m", "newSafemoonInstance", newSafemoonInstance);
    // await newSafemoonInstance.updateTotalExcluded();

    // // add liquidity
    // await newSafemoonInstance.approve(router.address, ethers.constants.MaxUint256);
    // await router.addLiquidityETH(proxy.address, parseUnits("1000", 9), 0, 0, deployer.address, 99999999999, {
    //   value: parseEther("1000"),
    // });

    // // swap 1 SFM to ETH
    // await router.swapExactTokensForETH(
    //   parseUnits("1000", 9),
    //   0,
    //   [proxy.address, weth.address],
    //   deployer.address,
    //   999999999,
    // );
  });
});
