async function main() {
    const BoxV2 = await ethers.getContractFactory("Safemoon")
    let box = await upgrades.upgradeProxy("0x77fF8AB3c9B4ff0a7cD7F29d8e0C262043Dc51BC", BoxV2)
    console.log("Your upgraded proxy is done!", box.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
