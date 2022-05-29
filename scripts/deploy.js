async function main() {
    const Factory = await ethers.getContractFactory("Safemoon")
    console.log("Deploying Factory, ProxyAdmin, and then Proxy...")
    const proxy = await upgrades.deployProxy(Factory,["0xE42D262dA212a25B7Fa5C40c545317ba24A7bE1b"], { initializer: 'initialize' })
    console.log("Proxy of Factory deployed to:", proxy.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })
