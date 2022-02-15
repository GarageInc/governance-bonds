import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { ethers, upgrades } from 'hardhat';

const func: DeployFunction = async (
  hre: HardhatRuntimeEnvironment,
): Promise<void> => {
  const locker = await ethers.getContractFactory('OnxLocker');
  const proxy = await upgrades.upgradeProxy(
    '0x424B1AE0AF693d4577dde25081E970cb656013C7',
    locker,
    {
      kind: 'transparent',
    },
  );

  await proxy.deployed();

  console.log('OnxLocker upgraded to:', proxy.address);
};

func.tags = ['OnxLockerUpgrade'];

export default func;
