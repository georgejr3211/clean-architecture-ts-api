export interface Encrypter {
    encrypt(value: string | number): Promise<string>
}