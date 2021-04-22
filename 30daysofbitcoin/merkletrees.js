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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.hashMerkleBranches = exports.getBlock = exports.getBestBlockHash = exports.toPairs = exports.ChainHash = void 0;
var node_fetch_1 = require("node-fetch");
var crypto = require("crypto");
/**
 * Crypto utilities
 */
var sha256 = function (preimage) {
    return crypto.createHash("sha256").update(preimage).digest();
};
var doubleSHA256 = function (preimage) {
    return sha256(sha256(preimage));
};
/**
 * ChainHash typically represents double SHA256 of data, such as bitcoin
 * messages, transactions, etc.
 */
var ChainHash = /** @class */ (function () {
    function ChainHash(hash) {
        this.hash = typeof hash === "string" ? Buffer.from(hash, "hex") : hash;
    }
    /**
     * Returns hexadecimal string representation the ChainHash.
     */
    ChainHash.prototype.toString = function () {
        return this.hash.toString("hex");
    };
    /**
     * Returns a new ChainHash containing the byte-reversed hash.
     *
     * Useful for reading a ChainHash in little-endian format.
     */
    ChainHash.prototype.reverse = function () {
        return new ChainHash(this.toString().match(/../g).reverse().join(""));
    };
    /**
     * Returns a new ChainHash by concatenating it with the specified ChainHash.
     */
    ChainHash.prototype.concat = function (other) {
        var hash = Buffer.concat([this.hash, other.hash]);
        return new ChainHash(hash);
    };
    return ChainHash;
}());
exports.ChainHash = ChainHash;
/**
 * Merkle Tree builder and utils
 *
 *	         root = h1234 = h(h12 + h34)
 * 	        /                           \
 *	  h12 = h(h1 + h2)            h34 = h(h3 + h4)
 *	   /            \              /            \
 *	h1 = h(tx1)  h2 = h(tx2)    h3 = h(tx3)  h4 = h(tx4)
 */
/**
 * Read a list of ChainHash objects and split it into chunks of 2 items.
 */
var toPairs = function (transactions) {
    return Array.from(Array(Math.ceil(transactions.length / 2)), function (_, i) {
        return transactions.slice(i * 2, i * 2 + 2);
    });
};
exports.toPairs = toPairs;
/**
 * Returns the hash of the best (tip) block in the most-work fully-validated
 * chain.
 */
var getBestBlockHash = function () {
    return node_fetch_1["default"]("https://blockchain.info/q/latesthash?cors=true")
        .then(function (r) { return r.text(); })
        .then(function (h) { return new ChainHash(h); });
};
exports.getBestBlockHash = getBestBlockHash;
/**
 * Fetch raw block data and return the merkle root and transaction hashes
 * contained in the block.
 */
var getBlock = function (blockHash) {
    return node_fetch_1["default"]("https://blockchain.info/rawblock/" + blockHash.toString() + "?cors=true")
        .then(function (r) { return r.json(); })
        .then(function (block) {
        return ({
            merkleRoot: new ChainHash(block.mrkl_root),
            transactions: block.tx.map(function (tx) { return new ChainHash(tx.hash); })
        });
    });
};
exports.getBlock = getBlock;
/**
 * hashMerkleBranches takes two ChainHash items, treated as the left and right
 * tree nodes, and returns the hash of their concatenation.
 *
 * The hash function used is Double-SHA256, and the preimage must be provided
 * little-endian format. If there is no right tree node, we hash the left node
 * to itself.
 *
 * This is a helper function used to aid in the generation of a merkle tree.
 */
var hashMerkleBranches = function (pair) {
    var left = pair[0], _a = pair[1], right = _a === void 0 ? left : _a;
    var concatChainHash = left.reverse().concat(right.reverse());
    return new ChainHash(doubleSHA256(concatChainHash.hash)).reverse();
};
exports.hashMerkleBranches = hashMerkleBranches;
/**
 * Build the Merkle Root from a list of transactions ChainHash objects.
 *
 * This algorithm works recursively, so the JS runtime may have restrictions
 * on the stack size.
 */
var buildMerkleRoot = function (transactions) {
    return transactions.length === 1
        ? transactions[0]
        : buildMerkleRoot(exports.toPairs(transactions).reduce(function (tree, pair) { return __spreadArray(__spreadArray([], tree), [exports.hashMerkleBranches(pair)]); }, []));
};
var driver = function () { return __awaiter(void 0, void 0, void 0, function () {
    var blockHash, block, want, got;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getBestBlockHash()];
            case 1:
                blockHash = _a.sent();
                console.log("Best block hash: " + blockHash.toString());
                return [4 /*yield*/, exports.getBlock(blockHash)];
            case 2:
                block = _a.sent();
                want = block.merkleRoot.toString();
                console.log("Merkle root: " + want);
                console.log("Transactions:");
                console.dir(block.transactions.map(function (tx) { return tx.toString(); }), { maxArrayLength: 5 });
                got = buildMerkleRoot(block.transactions).toString();
                got === want
                    ? console.log("✓ Merkle root is valid.")
                    : console.error("\u2716 Merkle root is invalid. got=" + got + " want=" + want);
                return [2 /*return*/];
        }
    });
}); };
// driver()
