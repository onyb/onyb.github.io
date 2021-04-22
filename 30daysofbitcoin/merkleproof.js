"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var lib = require("./merkletrees");
/**
 * Helper functions
 */
var random = function (arr) { return arr[Math.floor(Math.random() * arr.length)]; };
/**
 * Generate a Merkle proof containing the data required to reconstruct the
 * Merkle root from a given transaction hash.
 *
 * It provides a list of partial proofs required to obtain the Merkle tree
 * parent.
 *
 * [number, lib.ChainHash]
 *    ^ index     ^ merkle branch to hash with
 *
 * index may be 0 or 1, depending on whether the merkle branch to hash
 * with is the left node or right node, respectively.
 *
 *      parent
 *       / \
 *      /  \      => partial proof is [1, abcdef]
 *    tx  abcdef
 */
var generateMerkleProof = function (txs, tx, proof) {
    if (proof === void 0) { proof = []; }
    if (txs.length === 1) {
        return proof;
    }
    var tree = [];
    lib.toPairs(txs).forEach(function (pair) {
        var hash = lib.hashMerkleBranches(pair);
        if (pair.includes(tx)) {
            // If transaction hash is the left node, the proof should contain the
            // right node.
            var idx = pair[0] === tx ? 1 : 0;
            proof.push([idx, pair[idx]]);
            tx = hash;
        }
        tree.push(hash);
    });
    return generateMerkleProof(tree, tx, proof);
};
/**
 * Evaluate a Merkle proof for a given transaction hash, to obtain the Merkle
 * root.
 */
var getMerkleRootFromProof = function (proof, tx) {
    return proof.reduce(function (root, _a) {
        var idx = _a[0], hash = _a[1];
        return idx === 0
            ? lib.hashMerkleBranches([hash, root])
            : lib.hashMerkleBranches([root, hash]);
    }, tx);
};
var driver = function () { return __awaiter(void 0, void 0, void 0, function () {
    var blockHash, block, want, randomTx, proof, got;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, lib.getBestBlockHash()];
            case 1:
                blockHash = _a.sent();
                console.log("Best block hash: " + blockHash.toString());
                return [4 /*yield*/, lib.getBlock(blockHash)];
            case 2:
                block = _a.sent();
                want = block.merkleRoot.toString();
                console.log("Merkle root: " + want);
                console.log("Transactions:");
                console.dir(block.transactions.map(function (tx) { return tx.toString(); }), { maxArrayLength: 5 });
                randomTx = random(block.transactions);
                console.log("\nMerkle proof for transaction: " + randomTx.toString());
                proof = generateMerkleProof(block.transactions, randomTx);
                console.dir(proof.map(function (_a) {
                    var idx = _a[0], hash = _a[1];
                    return [idx, hash.toString()];
                }), { maxArrayLength: 5 });
                got = getMerkleRootFromProof(proof, randomTx).toString();
                got === want
                    ? console.log("✓ Merkle proof is valid.")
                    : console.error("\u2716 Merkle proof is invalid. got=" + got + " want=" + want);
                return [2 /*return*/];
        }
    });
}); };
driver();
