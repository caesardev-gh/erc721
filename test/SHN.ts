import { ethers } from "hardhat";
import { Signer, Contract } from "ethers";
import { expect } from "chai";

describe("Superheroine", function () {
    let owner: Signer;
    let addr1: Signer;
    let addr2: Signer;
    let superheroine: Contract;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        const Superheroine = await ethers.getContractFactory("Superheroine");
        superheroine = await Superheroine.deploy();
        await superheroine.deployed();
    });

    describe("minting", function () {
        it("should mint a new token", async function () {
            await superheroine.safeMint(await addr1.getAddress(), "uri");

            const tokenId = await superheroine.tokenOfOwnerByIndex(await addr1.getAddress(), 0);
            expect(tokenId).to.equal(0);
        });

        it("should only allow the owner to mint", async function () {
            await expect(superheroine.connect(addr1).safeMint(await addr2.getAddress(), "uri")).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });
});
