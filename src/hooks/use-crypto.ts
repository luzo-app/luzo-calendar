import { getCookie } from "@/lib/cookies";
import CryptoJS from "crypto-js";

type SuccessResult<T> = {
    success: true;
    data: T;
    error: null;
};

type ErrorResult = {
    success: false;
    data: null;
    error: Error;
};

type CryptoResult<T> = SuccessResult<T> | ErrorResult;

const createSuccessResult = <T>(data: T): SuccessResult<T> => ({
    success: true,
    data,
    error: null,
});

const createErrorResult = (error: Error): ErrorResult => ({
    success: false,
    data: null,
    error,
});

const encryptData = (data: string, key: string = getCookie("encryptionKey") || ""): CryptoResult<string> => {
    try {
        const ciphertext = CryptoJS.AES.encrypt(data, key.toString()).toString();
        return createSuccessResult(ciphertext);
    } catch (error) {
        return createErrorResult(error as Error);
    }
};

const decryptData = (ciphertext: string, key: string = getCookie("encryptionKey") || ""): CryptoResult<string> => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), key.toString());
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return createSuccessResult(decryptedData);
    } catch (error) {
        return createErrorResult(error as Error);
    }
};

const useCrypto = () => {
    return {
        encryptData,
        decryptData,
    };
};

export default useCrypto;