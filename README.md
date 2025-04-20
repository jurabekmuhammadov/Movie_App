# 🎬 Movie App

Movie App is a sleek and responsive movie discovery app built with **React.js**, styled using **TailwindCSS**, and powered by **Appwrite** for trending movie tracking. It integrates with **The Movie Database (TMDB) API** to provide real-time search, trending listings, and popular films.

## 🌟 Features

- 🔍 **Search Movies**: Find movies by title using TMDB’s powerful search API.
- 📈 **Trending Movies Algorithm**: Appwrite tracks and updates trending movies based on user searches.
- 🧠 **Debounced Search**: Reduces unnecessary API calls by waiting until the user finishes typing.
- 🎨 **Responsive UI**: Built with TailwindCSS to ensure a beautiful and consistent design on all screen sizes.
- ⚡ **Fast and Lightweight**: Smooth performance with minimal load times.

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Styling**: TailwindCSS
- **Backend**: Appwrite (Database, API integration)
- **API**: [TMDB (The Movie Database)](https://www.themoviedb.org/)
- **Deployment**: Vercel

## 🚀 Getting Started

Follow these steps to run Movie App locally on your machine.

### 1. Clone the repository

```bash
git clone https://github.com/jurabekmuhammadov/Movie_App.git
cd Movie_App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project and add your environment variables:

```env
VITE_TMDB_KEY=your_tmdb_bearer_token
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

> ✅ Make sure you use your TMDB **v4 Bearer Token**, not the v3 API key.

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 🌐 Deployment

This project is deployed on **Vercel**. To deploy it yourself:

1. Push the project to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and import the GitHub repo.
3. Add the same environment variables in **Project Settings > Environment Variables**.
4. Deploy your project.

## 🧠 Credits

- 🎬 Movie data provided by [TMDB](https://www.themoviedb.org/)
- ☁️ Backend and database powered by [Appwrite](https://appwrite.io/)
- 💄 Styling by [TailwindCSS](https://tailwindcss.com/)

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

> Made with 👨🏻‍💻 by Jurabek Muhammadov
