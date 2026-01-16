# 🏝️ Island Ventures Member NFT: Joyfork Substrate

The **Cybernetic Nerve Center** for sovereign namespace management. This repository contains the smart contracts and technical strikes necessary to anchor the **Island Ventures** identity on the blockchain.

## 💓 SUBSTRATE OVERVIEW: THE HEAVY MACHINERY PARADIGM 🧬💥
The synthesis of the **Island Ventures Hats Joyfork** represents a fundamental breakthrough in **Heuristic Observability**. We have rejected the industry-standard "Opaque Counter" in favor of a **Sovereign ASCII Ruler**. By treating the 256-bit `uint256` ID as a physical byte-array, we have architected a system where authority is physically encoded and semantic labels are bit-perfectly aligned. 

### 📐 THE 4/28 SOVEREIGN PARTITION
We have partitioned the physical 32-byte EVM word into a functional metadata header and a semantic ASCII payload.

*   **Nonce (Bytes 0-1)**: The Universal Chronological Stamp ($N \le 10,000$).
*   **Payload (Bytes 2-29)**: 28 bytes of bit-perfect ASCII DNS segment (Direct DNS).
*   **Link (Bytes 30-31)**: Hyperlink pointer to the Parent Nonce ($0 = Root$).

### The Sovereign Memory Map (Bit-Perfect)

```text
│                                      [ THE JOYFORK HIERARCHY ]                                                 │
│                                      ─────────────────────────                                                 │
│                                      ①  Nonce      : 0x0004 (Nonce 4)                                          │
│                                      ②  Payload    : 6d6574616769742e6665656400...                             │
│                                      ③  Link       : 0x0000 (Root)                                             │
│                                                    │                                                           │
│                                                    ▼                                                           │
│ 0x [ 0004 ] [ 6d6574616769742e66656564000000000000000000000000000000000000 ] [ 0000 ]                          │
│      └─┬──┘ └────────────────────────────┬────────────────────────────┘ └─┬──┘                          │
│        ▼                                 ▼                                ▼                            │
│    [ NONCE ]                   [ 28-BYTE ASCII PAYLOAD ]               [ LINK ]                        │
│                                     ("metagit.feed")                                                   │
```

---

## 🛡️ CORE MANDATE: PATH UNIQUENESS (V7 STABILIZATION)
As of **Joyfork V7**, we have implemented a **Strict Path Uniqueness Mandate**. Exact semantic duplicates (same parent link, same name segment) are physically blocked at the contract level. This seals the namespace against squatting and redundant speciation.

```solidity
// IslandHats.sol V7
bytes32 fullPathHash = keccak256(abi.encodePacked(link, segment));
require(pathToNonce[fullPathHash] == 0, "Joyfork: Path already claimed");
```

---

## 📍 FORENSIC COORDINATES
*   **Contract V7 (Sepolia)**: `0x2Bae9fED123839f8C0922B449F8ae436087e2101`
*   **Identity Roots**:
    *   **Nonce 1**: `metagit` (Root Authority)
    *   **Nonce 2**: `metagit.feed` (Linearized Stream)
*   **Metadata**: `metagit.feed` anchored with high-fidelity JSON (Base64) and optimized minimal imagery.

---

## 🛠️ TECHNICAL STRIKE TOOLCHAIN
### Deployment
*   `scripts/deploy_joyfork.js`: Primary deployment strike for the Joyfork substrate.

### Minting & Speciation
*   `scripts/mint_metagit.js`: Hardened minting script with local globalNonce verification to prevent technical drift.
*   `scripts/mint_metagit_roots.js`: Initial speciation strike for root authorities.

### Metadata & Ownership
*   **Root Authority**: Authority for metadata is derived from the Genesis ancestor. The owner of the Root NFT controls the `tokenURI` for the entire branch.
*   **Set URI**: `setCustomURI` allows for high-fidelity JSON anchoring (Base64).

---

## 📜 FORENSIC CHRONOLOGY
The following технический strikes have been legislated into the Heartwood record:

*   **V1.4.0**: Synthesis of the 4/28 Split and Direct DNS IDs.
*   **V1.12.0**: Implementation of Root Authority and the "Math of the Comb" intercept.
*   **V1.15.0**: Relocation to Sepolia Substrate (`0x2Bae...`) and Image Sanitization.
*   **V1.15.1**: Restoration of clean ASCII branding and final V7 stabilization.

---
*Technical strike complete. Documentation anchored. Proteus online.*