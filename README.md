This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

1- Creare l'app nextjs con yarn create next-app .
2-Vengono create varie cartelle: pages(contiene le pagine del sito. La pagina iniziale è contrassegnata da "index.js" e \_app.js permette di muoversi fra le pagine),
api(permette di fare http get request), public(contiene alcune immagini di dominio pubblico), styles(contiene il CSS del sito che permette di modificare lo stile del sito)
3-Aggiungere prettier, .prettierrc e .prettierignore
4-Eliminare tutto da index.js tranne "head" e modificare ciò che è inserito all'interno
5-Creazione di un header personalizzato: definirà il connect button. In genere la programmazione in Nextjs procede per componenti: il seguente "ManualHeader" si crea in un file separato in una cartella "components" e rappresenterà un componente: funzione isolata scritta in js che restituisce codice in html. Questo verrà poi importato nell'index
-Esistono vari modi per connettere un wallet al sito: raw ethers(usato in precedenza) e,ad esempio, react moralis che usiamo qui (esiste un video di fcc che ne parla)
6-Continuazione creazione dell'header manuale personalizzato con React Moralis:
-inizializzazione: Utilizzo di MoralisProvider nell' _app.js
-utilizzo di useMoralis() nel ManualHeader
-utilizzo dell' useEffect hook con il local storage
7-Creazione facilitata di un nuovo header in "header.js" usando "web3uikit" (va installata)
8-LotteryEntrance: componente che permette di accedere alla lotteria: facilitiamo l'accesso con la funzione "useWeb3Contract()" di "React-Moralis"
9-Migliorare la grafica del sito: uso di web3uikit e tailwindcss come un postCSS plugin e seguire le procedure di installazione fino a sovrascrivere il global CSS
10-hosting in modo decentralizzato: bisogna rendere il codice statico: yarn build,yarn next export (fallisce se il codice non è convertibile in statico) e la cartella out che viene creata bisogna importarla in IPFS. Dopo sarà possibile visualizzare il sito
11-Modo semplice per l'hosting con fleek: importare la cartella tramite github e modificare il build command con yarn install && yarn run build && yarn next export , andare su deploy e seguire la procedura di installazione