pragma circom 2.2.2;
include "./circomlib/circuits/poseidon.circom";

template Auth() {
    signal input businessName;
    signal input registrationNumber;
    signal input taxId;
    signal input walletAddress;
    signal input businessEmail;
    signal input registeredAddress;

    signal input givenHash;
    signal output computedHash;

    component poseidonHasher = Poseidon(6);
    poseidonHasher.inputs[0] <== businessName;
    poseidonHasher.inputs[1] <== registrationNumber;
    poseidonHasher.inputs[2] <== taxId;
    poseidonHasher.inputs[3] <== walletAddress;
    poseidonHasher.inputs[4] <== businessEmail;
    poseidonHasher.inputs[5] <== registeredAddress;

    computedHash <== poseidonHasher.out;

    computedHash === givenHash;
}

component main = Auth();