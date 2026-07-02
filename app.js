// === KONFIGURASI SMART CONTRACT ===
const contractAddress = "0xDea8fe83039735c546B1EaE7588217172251655a";
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_indexPeminjaman",
				"type": "uint256"
			}
		],
		"name": "approveLoan",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_idAset",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_namaAset",
				"type": "string"
			}
		],
		"name": "registerAsset",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_idAset",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_peminjam",
				"type": "string"
			}
		],
		"name": "requestBorrow",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_indexPeminjaman",
				"type": "uint256"
			}
		],
		"name": "returnAsset",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "daftarAset",
		"outputs": [
			{
				"internalType": "string",
				"name": "idAset",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "namaAset",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "tersedia",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "riwayatPeminjaman",
		"outputs": [
			{
				"internalType": "string",
				"name": "peminjam",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "idAset",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "disetujui",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "sudahKembali",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let provider;
let signer;
let asetContract;

  // === FUNGSI KONEKSI METAMASK ===
async function initMetaMask() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // --- FITUR BARU: Cek Jaringan Sepolia ---
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            // 0xaa36a7 adalah ID jaringan untuk Sepolia Testnet
            if (chainId !== '0xaa36a7') {
                alert("⚠️ Jaringan salah! Tolong ganti jaringan MetaMask kamu ke 'Sepolia' agar dApp berfungsi.");
                
                // Opsional: Otomatis nyuruh MetaMask ganti jaringan
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: '0xaa36a7' }],
                    });
                } catch (switchError) {
                    return false; // Batal kalau user nolak ganti jaringan
                }
            }
            // ----------------------------------------

            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            asetContract = new ethers.Contract(contractAddress, contractABI, signer);
            
            const address = await signer.getAddress();
            console.log("Berhasil terhubung dengan dompet:", address);
            return true;
        } catch (error) {
            console.error("User menolak koneksi:", error);
            return false;
        }
    } else {
        alert("MetaMask belum ter-install di browser ini!");
        return false;
    }
}