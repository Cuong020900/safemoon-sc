import { Wallet } from "ethers";
import { ethers, waffle } from "hardhat";
import { decimals, fixture, price, requireStakeAmount } from "./utils/fixture";
import { MockOracle, Payment, Safemoon } from "../typechain";
import { XCN } from "../typechain/XCN";
import { beautifyObject } from "./utils/utils";
import { expect } from "chai";

describe("Payment", () => {
  let wallets: Wallet[];
  let deployer: Wallet;
  let account1: Wallet;
  let safemoon: Safemoon;
  let loadFixture: ReturnType<typeof waffle.createFixtureLoader>;

  before("create fixture loader", async () => {
    wallets = await (ethers as any).getSigners();
    deployer = wallets[0];
    account1 = wallets[1];
  });

  beforeEach(async () => {
    loadFixture = waffle.createFixtureLoader(wallets as any);
    ({ safemoon } = await loadFixture(fixture));
  });

  it("test", async () => {});
});
