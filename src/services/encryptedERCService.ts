import {
  Contract,
  Provider,
  Signer,
  ethers,
  ContractTransaction,
  ContractTransactionResponse,
  TransactionReceipt,
} from "ethers";
import {
  Point,
  EGCT,
  AmountPCT,
  ProofPoints,
  BurnProof,
  MintProof,
  TransferProof,
  WithdrawProof,
  CreateEncryptedERCParams,
  EncryptedBalance,
  BasicBalance,
  PrivateMintEvent,
  PrivateBurnEvent,
  PrivateTransferEvent,
  DepositEvent,
  WithdrawEvent,
  ContractConfig,
  DepositParams,
  WithdrawParams,
  TransferParams,
  PrivateMintParams,
  PrivateBurnParams,
  TokenInfo,
  ContractInfo,
} from "../types/encryptedERC";

// ABI del contrato EncryptedERC (simplificado para las funciones principales)
const ENCRYPTED_ERC_ABI = [
  // Funciones de consulta (view)
  "function alreadyMinted(uint256 mintNullifier) view returns (bool)",
  "function auditor() view returns (address)",
  "function auditorPublicKey() view returns (tuple(uint256 x, uint256 y))",
  "function balanceOf(address user, uint256 tokenId) view returns (tuple(tuple(tuple(uint256 x, uint256 y) c1, tuple(uint256 x, uint256 y) c2) eGCT, uint256 nonce, tuple(tuple(uint256[] pct, uint256 index)[] amountPCTs, uint256[] balancePCT, uint256 transactionIndex))",
  "function balanceOfStandalone(address user) view returns (tuple(tuple(tuple(uint256 x, uint256 y) c1, tuple(uint256 x, uint256 y) c2) eGCT, uint256 nonce, tuple(tuple(uint256[] pct, uint256 index)[] amountPCTs, uint256[] balancePCT, uint256 transactionIndex))",
  "function balances(address user, uint256 tokenId) view returns (tuple(tuple(tuple(uint256 x, uint256 y) c1, tuple(uint256 x, uint256 y) c2) eGCT, uint256 nonce, uint256 transactionIndex))",
  "function blacklistedTokens(address tokenAddress) view returns (bool)",
  "function burnVerifier() view returns (address)",
  "function decimals() view returns (uint8)",
  "function getBalanceFromTokenAddress(address user, address tokenAddress) view returns (tuple(tuple(tuple(uint256 x, uint256 y) c1, tuple(uint256 x, uint256 y) c2) eGCT, uint256 nonce, tuple(tuple(uint256[] pct, uint256 index)[] amountPCTs, uint256[] balancePCT, uint256 transactionIndex))",
  "function getTokens() view returns (address[])",
  "function isAuditorKeySet() view returns (bool)",
  "function isConverter() view returns (bool)",
  "function mintVerifier() view returns (address)",
  "function name() view returns (string)",
  "function nextTokenId() view returns (uint256)",
  "function owner() view returns (address)",
  "function pendingOwner() view returns (address)",
  "function registrar() view returns (address)",
  "function symbol() view returns (string)",
  "function tokenAddresses(uint256 tokenId) view returns (address)",
  "function tokenIds(address tokenAddress) view returns (uint256)",
  "function tokens(uint256) view returns (address)",
  "function transferVerifier() view returns (address)",
  "function withdrawVerifier() view returns (address)",

  // Funciones de transacción (nonpayable)
  "function acceptOwnership()",
  "function deposit(uint256 amount, address tokenAddress, uint256[] amountPCT)",
  "function privateBurn(tuple(tuple(tuple(uint256, uint256) a, tuple(tuple(uint256, uint256), tuple(uint256, uint256)) b, tuple(uint256, uint256) c) proofPoints, uint256[] publicSignals) proof, uint256[] balancePCT)",
  "function privateMint(address user, tuple(tuple(tuple(uint256, uint256) a, tuple(tuple(uint256, uint256), tuple(uint256, uint256)) b, tuple(uint256, uint256) c) proofPoints, uint256[] publicSignals) proof)",
  "function renounceOwnership()",
  "function setAuditorPublicKey(address user)",
  "function setTokenBlacklist(address token, bool blacklisted)",
  "function transfer(address to, uint256 tokenId, tuple(tuple(tuple(uint256, uint256) a, tuple(tuple(uint256, uint256), tuple(uint256, uint256)) b, tuple(uint256, uint256) c) proofPoints, uint256[] publicSignals) proof, uint256[] balancePCT)",
  "function transferOwnership(address newOwner)",
  "function withdraw(uint256 tokenId, tuple(tuple(tuple(uint256, uint256) a, tuple(tuple(uint256, uint256), tuple(uint256, uint256)) b, tuple(uint256, uint256) c) proofPoints, uint256[] publicSignals) proof, uint256[] balancePCT)",

  // Eventos
  "event AuditorChanged(address indexed oldAuditor, address indexed newAuditor)",
  "event Deposit(address indexed user, uint256 amount, uint256 dust, uint256 tokenId)",
  "event OwnershipTransferStarted(address indexed previousOwner, address indexed newOwner)",
  "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
  "event PrivateBurn(address indexed user, uint256[7] auditorPCT, address indexed auditorAddress)",
  "event PrivateMint(address indexed user, uint256[7] auditorPCT, address indexed auditorAddress)",
  "event PrivateTransfer(address indexed from, address indexed to, uint256[7] auditorPCT, address indexed auditorAddress)",
  "event Withdraw(address indexed user, uint256 amount, uint256 tokenId, uint256[7] auditorPCT, address indexed auditorAddress)",
];

export class EncryptedERCService {
  private contract: Contract;
  private provider: Provider;
  private signer?: Signer;

  constructor(config: ContractConfig, provider: Provider, signer?: Signer) {
    this.provider = provider;
    this.signer = signer;
    this.contract = new Contract(
      config.contractAddress,
      ENCRYPTED_ERC_ABI,
      signer || provider
    );
  }

  // ==================== FUNCIONES DE CONSULTA ====================

  /**
   * Verifica si un nullifier de mint ya fue usado
   */
  async alreadyMinted(mintNullifier: bigint): Promise<boolean> {
    return await this.contract.alreadyMinted(mintNullifier);
  }

  /**
   * Obtiene la dirección del auditor
   */
  async getAuditor(): Promise<string> {
    return await this.contract.auditor();
  }

  /**
   * Obtiene la clave pública del auditor
   */
  async getAuditorPublicKey(): Promise<Point> {
    const result = await this.contract.auditorPublicKey();
    return {
      x: result.x,
      y: result.y,
    };
  }

  /**
   * Obtiene el balance encriptado de un usuario para un token específico
   */
  async getBalance(user: string, tokenId: bigint): Promise<EncryptedBalance> {
    const result = await this.contract.balanceOf(user, tokenId);
    return {
      eGCT: {
        c1: { x: result.eGCT.c1.x, y: result.eGCT.c1.y },
        c2: { x: result.eGCT.c2.x, y: result.eGCT.c2.y },
      },
      nonce: result.nonce,
      amountPCTs: result.amountPCTs.map((pct: any) => ({
        pct: pct.pct,
        index: pct.index,
      })),
      balancePCT: result.balancePCT,
      transactionIndex: result.transactionIndex,
    };
  }

  /**
   * Obtiene el balance encriptado de un usuario para el token standalone
   */
  async getBalanceStandalone(user: string): Promise<EncryptedBalance> {
    const result = await this.contract.balanceOfStandalone(user);
    return {
      eGCT: {
        c1: { x: result.eGCT.c1.x, y: result.eGCT.c1.y },
        c2: { x: result.eGCT.c2.x, y: result.eGCT.c2.y },
      },
      nonce: result.nonce,
      amountPCTs: result.amountPCTs.map((pct: any) => ({
        pct: pct.pct,
        index: pct.index,
      })),
      balancePCT: result.balancePCT,
      transactionIndex: result.transactionIndex,
    };
  }

  /**
   * Obtiene el balance básico de un usuario para un token específico
   */
  async getBasicBalance(user: string, tokenId: bigint): Promise<BasicBalance> {
    const result = await this.contract.balances(user, tokenId);
    return {
      eGCT: {
        c1: { x: result.eGCT.c1.x, y: result.eGCT.c1.y },
        c2: { x: result.eGCT.c2.x, y: result.eGCT.c2.y },
      },
      nonce: result.nonce,
      transactionIndex: result.transactionIndex,
    };
  }

  /**
   * Verifica si un token está en la lista negra
   */
  async isTokenBlacklisted(tokenAddress: string): Promise<boolean> {
    return await this.contract.blacklistedTokens(tokenAddress);
  }

  /**
   * Obtiene la dirección del verificador de burn
   */
  async getBurnVerifier(): Promise<string> {
    return await this.contract.burnVerifier();
  }

  /**
   * Obtiene los decimales del token
   */
  async getDecimals(): Promise<number> {
    return await this.contract.decimals();
  }

  /**
   * Obtiene el balance encriptado de un usuario usando la dirección del token
   */
  async getBalanceFromTokenAddress(
    user: string,
    tokenAddress: string
  ): Promise<EncryptedBalance> {
    const result = await this.contract.getBalanceFromTokenAddress(
      user,
      tokenAddress
    );
    return {
      eGCT: {
        c1: { x: result.eGCT.c1.x, y: result.eGCT.c1.y },
        c2: { x: result.eGCT.c2.x, y: result.eGCT.c2.y },
      },
      nonce: result.nonce,
      amountPCTs: result.amountPCTs.map((pct: any) => ({
        pct: pct.pct,
        index: pct.index,
      })),
      balancePCT: result.balancePCT,
      transactionIndex: result.transactionIndex,
    };
  }

  /**
   * Obtiene la lista de tokens registrados
   */
  async getTokens(): Promise<string[]> {
    return await this.contract.getTokens();
  }

  /**
   * Verifica si la clave del auditor está configurada
   */
  async isAuditorKeySet(): Promise<boolean> {
    return await this.contract.isAuditorKeySet();
  }

  /**
   * Verifica si el contrato está en modo converter
   */
  async isConverter(): Promise<boolean> {
    return await this.contract.isConverter();
  }

  /**
   * Obtiene la dirección del verificador de mint
   */
  async getMintVerifier(): Promise<string> {
    return await this.contract.mintVerifier();
  }

  /**
   * Obtiene el nombre del token
   */
  async getName(): Promise<string> {
    return await this.contract.name();
  }

  /**
   * Obtiene el siguiente ID de token
   */
  async getNextTokenId(): Promise<bigint> {
    return await this.contract.nextTokenId();
  }

  /**
   * Obtiene la dirección del propietario del contrato
   */
  async getOwner(): Promise<string> {
    return await this.contract.owner();
  }

  /**
   * Obtiene la dirección del propietario pendiente
   */
  async getPendingOwner(): Promise<string> {
    return await this.contract.pendingOwner();
  }

  /**
   * Obtiene la dirección del contrato registrar
   */
  async getRegistrar(): Promise<string> {
    return await this.contract.registrar();
  }

  /**
   * Obtiene el símbolo del token
   */
  async getSymbol(): Promise<string> {
    return await this.contract.symbol();
  }

  /**
   * Obtiene la dirección de un token por su ID
   */
  async getTokenAddress(tokenId: bigint): Promise<string> {
    return await this.contract.tokenAddresses(tokenId);
  }

  /**
   * Obtiene el ID de un token por su dirección
   */
  async getTokenId(tokenAddress: string): Promise<bigint> {
    return await this.contract.tokenIds(tokenAddress);
  }

  /**
   * Obtiene la dirección de un token por índice
   */
  async getTokenByIndex(index: bigint): Promise<string> {
    return await this.contract.tokens(index);
  }

  /**
   * Obtiene la dirección del verificador de transfer
   */
  async getTransferVerifier(): Promise<string> {
    return await this.contract.transferVerifier();
  }

  /**
   * Obtiene la dirección del verificador de withdraw
   */
  async getWithdrawVerifier(): Promise<string> {
    return await this.contract.withdrawVerifier();
  }

  /**
   * Obtiene información completa del contrato
   */
  async getContractInfo(): Promise<ContractInfo> {
    const [
      name,
      symbol,
      decimals,
      isConverter,
      auditor,
      isAuditorKeySet,
      registrar,
      nextTokenId,
    ] = await Promise.all([
      this.getName(),
      this.getSymbol(),
      this.getDecimals(),
      this.isConverter(),
      this.getAuditor(),
      this.isAuditorKeySet(),
      this.getRegistrar(),
      this.getNextTokenId(),
    ]);

    return {
      name,
      symbol,
      decimals,
      isConverter,
      auditor,
      isAuditorKeySet,
      registrar,
      nextTokenId,
    };
  }

  /**
   * Obtiene información de un token específico
   */
  async getTokenInfo(tokenAddress: string): Promise<TokenInfo> {
    const [id, isBlacklisted] = await Promise.all([
      this.getTokenId(tokenAddress),
      this.isTokenBlacklisted(tokenAddress),
    ]);

    return {
      address: tokenAddress,
      id,
      isBlacklisted,
    };
  }

  // ==================== FUNCIONES DE TRANSACCIÓN ====================

  /**
   * Acepta la transferencia de propiedad
   */
  async acceptOwnership(): Promise<ContractTransactionResponse> {
    if (!this.signer) {
      throw new Error("Signer is required for transactions");
    }
    return await this.contract.acceptOwnership();
  }

  /**
   * Deposita tokens ERC20 en el contrato
   */
  async deposit(params: DepositParams): Promise<ContractTransactionResponse> {
    if (!this.signer) {
      throw new Error("Signer is required for transactions");
    }
    return await this.contract.deposit(
      params.amount,
      params.tokenAddress,
      params.amountPCT
    );
  }

  /**
   * Realiza un burn privado de tokens
   */
  async privateBurn(
    params: PrivateBurnParams
  ): Promise<ContractTransactionResponse> {
    if (!this.signer) {
      throw new Error("Signer is required for transactions");
    }
    return await this.contract.privateBurn(params.proof, params.balancePCT);
  }

  /**
   * Realiza un mint privado de tokens
   */
  async privateMint(
    params: PrivateMintParams
  ): Promise<ContractTransactionResponse> {
    if (!this.signer) {
      throw new Error("Signer is required for transactions");
    }
    return await this.contract.privateMint(params.user, params.proof);
  }

  /**
   * Renuncia a la propiedad del contrato
   */
  async renounceOwnership(): Promise<ContractTransactionResponse> {
    if (!this.signer) {
      throw new Error("Signer is required for transactions");
    }
    return await this.contract.renounceOwnership();
  }

  /**
   * Establece la clave pública del auditor
   */
  async setAuditorPublicKey(
    user: string
  ): Promise<ContractTransactionResponse> {
    if (!this.signer) {
      throw new Error("Signer is required for transactions");
    }
    return await this.contract.setAuditorPublicKey(user);
  }

  /**
   * Establece el estado de blacklist de un token
   */
  async setTokenBlacklist(
    token: string,
    blacklisted: boolean
  ): Promise<ContractTransactionResponse> {
    if (!this.signer) {
      throw new Error("Signer is required for transactions");
    }
    return await this.contract.setTokenBlacklist(token, blacklisted);
  }

  /**
   * Transfiere tokens encriptados entre usuarios
   */
  async transfer(params: TransferParams): Promise<ContractTransactionResponse> {
    if (!this.signer) {
      throw new Error("Signer is required for transactions");
    }
    return await this.contract.transfer(
      params.to,
      params.tokenId,
      params.proof,
      params.balancePCT
    );
  }

  /**
   * Transfiere la propiedad del contrato
   */
  async transferOwnership(
    newOwner: string
  ): Promise<ContractTransactionResponse> {
    if (!this.signer) {
      throw new Error("Signer is required for transactions");
    }
    return await this.contract.transferOwnership(newOwner);
  }

  /**
   * Retira tokens encriptados del contrato
   */
  async withdraw(params: WithdrawParams): Promise<ContractTransactionResponse> {
    if (!this.signer) {
      throw new Error("Signer is required for transactions");
    }
    return await this.contract.withdraw(
      params.tokenId,
      params.proof,
      params.balancePCT
    );
  }

  // ==================== UTILIDADES ====================

  /**
   * Espera a que una transacción sea confirmada
   */
  async waitForTransaction(
    tx: ContractTransactionResponse
  ): Promise<TransactionReceipt> {
    return await tx.wait();
  }

  /**
   * Obtiene el saldo de ETH de una dirección
   */
  async getBalance(address: string): Promise<bigint> {
    return await this.provider.getBalance(address);
  }

  /**
   * Obtiene el número de bloque actual
   */
  async getCurrentBlock(): Promise<number> {
    const block = await this.provider.getBlockNumber();
    return block;
  }

  /**
   * Escucha eventos del contrato
   */
  on(eventName: string, callback: (...args: any[]) => void) {
    this.contract.on(eventName, callback);
  }

  /**
   * Deja de escuchar eventos del contrato
   */
  off(eventName: string, callback?: (...args: any[]) => void) {
    if (callback) {
      this.contract.off(eventName, callback);
    } else {
      this.contract.removeAllListeners(eventName);
    }
  }

  /**
   * Obtiene la instancia del contrato
   */
  getContract(): Contract {
    return this.contract;
  }

  /**
   * Obtiene el provider
   */
  getProvider(): Provider {
    return this.provider;
  }

  /**
   * Obtiene el signer
   */
  getSigner(): Signer | undefined {
    return this.signer;
  }
}
