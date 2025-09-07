import { ethers } from "ethers";
import {
  Point,
  EGCT,
  AmountPCT,
  ProofPoints,
  BurnProof,
  MintProof,
  TransferProof,
  WithdrawProof,
} from "../types/encryptedERC";

/**
 * Utilidades para el contrato EncryptedERC
 */
export class EncryptedERCUtils {
  /**
   * Convierte un string a BigInt
   */
  static toBigInt(value: string | number): bigint {
    return BigInt(value);
  }

  /**
   * Convierte un BigInt a string
   */
  static fromBigInt(value: bigint): string {
    return value.toString();
  }

  /**
   * Convierte un string a BigInt con validación
   */
  static parseBigInt(value: string): bigint {
    try {
      return BigInt(value);
    } catch (error) {
      throw new Error(`Invalid BigInt value: ${value}`);
    }
  }

  /**
   * Valida una dirección Ethereum
   */
  static isValidAddress(address: string): boolean {
    try {
      return ethers.isAddress(address);
    } catch {
      return false;
    }
  }

  /**
   * Valida un hash de transacción
   */
  static isValidTxHash(hash: string): boolean {
    return /^0x[a-fA-F0-9]{64}$/.test(hash);
  }

  /**
   * Formatea una dirección para mostrar
   */
  static formatAddress(
    address: string,
    startChars: number = 6,
    endChars: number = 4
  ): string {
    if (!this.isValidAddress(address)) {
      return "Invalid Address";
    }
    return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
  }

  /**
   * Formatea un hash de transacción para mostrar
   */
  static formatTxHash(
    hash: string,
    startChars: number = 10,
    endChars: number = 8
  ): string {
    if (!this.isValidTxHash(hash)) {
      return "Invalid Hash";
    }
    return `${hash.slice(0, startChars)}...${hash.slice(-endChars)}`;
  }

  /**
   * Convierte wei a ether
   */
  static weiToEther(wei: bigint): string {
    return ethers.formatEther(wei);
  }

  /**
   * Convierte ether a wei
   */
  static etherToWei(ether: string): bigint {
    return ethers.parseEther(ether);
  }

  /**
   * Formatea un número con decimales
   */
  static formatNumber(value: bigint, decimals: number = 18): string {
    const divisor = BigInt(10 ** decimals);
    const integerPart = value / divisor;
    const fractionalPart = value % divisor;

    if (fractionalPart === 0n) {
      return integerPart.toString();
    }

    const fractionalStr = fractionalPart.toString().padStart(decimals, "0");
    const trimmedFractional = fractionalStr.replace(/0+$/, "");

    if (trimmedFractional === "") {
      return integerPart.toString();
    }

    return `${integerPart}.${trimmedFractional}`;
  }

  /**
   * Crea un objeto Point
   */
  static createPoint(x: bigint, y: bigint): Point {
    return { x, y };
  }

  /**
   * Crea un objeto EGCT
   */
  static createEGCT(c1: Point, c2: Point): EGCT {
    return { c1, c2 };
  }

  /**
   * Crea un objeto AmountPCT
   */
  static createAmountPCT(pct: bigint[], index: bigint): AmountPCT {
    return { pct, index };
  }

  /**
   * Crea un objeto ProofPoints
   */
  static createProofPoints(
    a: [bigint, bigint],
    b: [[bigint, bigint], [bigint, bigint]],
    c: [bigint, bigint]
  ): ProofPoints {
    return { a, b, c };
  }

  /**
   * Crea un objeto BurnProof
   */
  static createBurnProof(
    proofPoints: ProofPoints,
    publicSignals: bigint[]
  ): BurnProof {
    return { proofPoints, publicSignals };
  }

  /**
   * Crea un objeto MintProof
   */
  static createMintProof(
    proofPoints: ProofPoints,
    publicSignals: bigint[]
  ): MintProof {
    return { proofPoints, publicSignals };
  }

  /**
   * Crea un objeto TransferProof
   */
  static createTransferProof(
    proofPoints: ProofPoints,
    publicSignals: bigint[]
  ): TransferProof {
    return { proofPoints, publicSignals };
  }

  /**
   * Crea un objeto WithdrawProof
   */
  static createWithdrawProof(
    proofPoints: ProofPoints,
    publicSignals: bigint[]
  ): WithdrawProof {
    return { proofPoints, publicSignals };
  }

  /**
   * Valida un objeto Point
   */
  static validatePoint(point: Point): boolean {
    try {
      return typeof point.x === "bigint" && typeof point.y === "bigint";
    } catch {
      return false;
    }
  }

  /**
   * Valida un objeto EGCT
   */
  static validateEGCT(egct: EGCT): boolean {
    try {
      return this.validatePoint(egct.c1) && this.validatePoint(egct.c2);
    } catch {
      return false;
    }
  }

  /**
   * Valida un objeto ProofPoints
   */
  static validateProofPoints(proofPoints: ProofPoints): boolean {
    try {
      return (
        Array.isArray(proofPoints.a) &&
        proofPoints.a.length === 2 &&
        typeof proofPoints.a[0] === "bigint" &&
        typeof proofPoints.a[1] === "bigint" &&
        Array.isArray(proofPoints.b) &&
        proofPoints.b.length === 2 &&
        Array.isArray(proofPoints.b[0]) &&
        proofPoints.b[0].length === 2 &&
        typeof proofPoints.b[0][0] === "bigint" &&
        typeof proofPoints.b[0][1] === "bigint" &&
        Array.isArray(proofPoints.b[1]) &&
        proofPoints.b[1].length === 2 &&
        typeof proofPoints.b[1][0] === "bigint" &&
        typeof proofPoints.b[1][1] === "bigint" &&
        Array.isArray(proofPoints.c) &&
        proofPoints.c.length === 2 &&
        typeof proofPoints.c[0] === "bigint" &&
        typeof proofPoints.c[1] === "bigint"
      );
    } catch {
      return false;
    }
  }

  /**
   * Valida un objeto BurnProof
   */
  static validateBurnProof(proof: BurnProof): boolean {
    try {
      return (
        this.validateProofPoints(proof.proofPoints) &&
        Array.isArray(proof.publicSignals) &&
        proof.publicSignals.every((signal) => typeof signal === "bigint")
      );
    } catch {
      return false;
    }
  }

  /**
   * Valida un objeto MintProof
   */
  static validateMintProof(proof: MintProof): boolean {
    try {
      return (
        this.validateProofPoints(proof.proofPoints) &&
        Array.isArray(proof.publicSignals) &&
        proof.publicSignals.every((signal) => typeof signal === "bigint")
      );
    } catch {
      return false;
    }
  }

  /**
   * Valida un objeto TransferProof
   */
  static validateTransferProof(proof: TransferProof): boolean {
    try {
      return (
        this.validateProofPoints(proof.proofPoints) &&
        Array.isArray(proof.publicSignals) &&
        proof.publicSignals.every((signal) => typeof signal === "bigint")
      );
    } catch {
      return false;
    }
  }

  /**
   * Valida un objeto WithdrawProof
   */
  static validateWithdrawProof(proof: WithdrawProof): boolean {
    try {
      return (
        this.validateProofPoints(proof.proofPoints) &&
        Array.isArray(proof.publicSignals) &&
        proof.publicSignals.every((signal) => typeof signal === "bigint")
      );
    } catch {
      return false;
    }
  }

  /**
   * Convierte un objeto Point a string para logging
   */
  static pointToString(point: Point): string {
    return `Point(x: ${point.x.toString()}, y: ${point.y.toString()})`;
  }

  /**
   * Convierte un objeto EGCT a string para logging
   */
  static egctToString(egct: EGCT): string {
    return `EGCT(c1: ${this.pointToString(egct.c1)}, c2: ${this.pointToString(
      egct.c2
    )})`;
  }

  /**
   * Convierte un objeto ProofPoints a string para logging
   */
  static proofPointsToString(proofPoints: ProofPoints): string {
    return `ProofPoints(a: [${proofPoints.a[0].toString()}, ${proofPoints.a[1].toString()}], b: [[${proofPoints.b[0][0].toString()}, ${proofPoints.b[0][1].toString()}], [${proofPoints.b[1][0].toString()}, ${proofPoints.b[1][1].toString()}]], c: [${proofPoints.c[0].toString()}, ${proofPoints.c[1].toString()}])`;
  }

  /**
   * Genera un nonce aleatorio
   */
  static generateNonce(): bigint {
    return BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
  }

  /**
   * Genera un nullifier aleatorio
   */
  static generateNullifier(): bigint {
    return BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
  }

  /**
   * Calcula el hash de una cadena
   */
  static async hashString(input: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return (
      "0x" + hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    );
  }

  /**
   * Calcula el hash de un objeto
   */
  static async hashObject(obj: any): Promise<string> {
    const jsonString = JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    );
    return this.hashString(jsonString);
  }

  /**
   * Convierte un array de BigInt a array de string
   */
  static bigIntArrayToStringArray(arr: bigint[]): string[] {
    return arr.map((item) => item.toString());
  }

  /**
   * Convierte un array de string a array de BigInt
   */
  static stringArrayToBigIntArray(arr: string[]): bigint[] {
    return arr.map((item) => BigInt(item));
  }

  /**
   * Verifica si un valor es un BigInt válido
   */
  static isValidBigInt(value: any): value is bigint {
    return typeof value === "bigint";
  }

  /**
   * Verifica si un valor es un array de BigInt válido
   */
  static isValidBigIntArray(value: any): value is bigint[] {
    return (
      Array.isArray(value) && value.every((item) => this.isValidBigInt(item))
    );
  }

  /**
   * Clona un objeto Point
   */
  static clonePoint(point: Point): Point {
    return { x: point.x, y: point.y };
  }

  /**
   * Clona un objeto EGCT
   */
  static cloneEGCT(egct: EGCT): EGCT {
    return {
      c1: this.clonePoint(egct.c1),
      c2: this.clonePoint(egct.c2),
    };
  }

  /**
   * Clona un objeto ProofPoints
   */
  static cloneProofPoints(proofPoints: ProofPoints): ProofPoints {
    return {
      a: [proofPoints.a[0], proofPoints.a[1]],
      b: [
        [proofPoints.b[0][0], proofPoints.b[0][1]],
        [proofPoints.b[1][0], proofPoints.b[1][1]],
      ],
      c: [proofPoints.c[0], proofPoints.c[1]],
    };
  }
}
