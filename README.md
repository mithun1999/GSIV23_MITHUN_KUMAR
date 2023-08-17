## [Live App](https://gsynergy-mithun.vercel.app/)

## Prerequisites

Before you begin, ensure that you have the following software installed on your machine:

- Node.js (version 14 or later)
- npm (Node Package Manager, comes with Node.js)

## Installation

1. **Clone the Repository:** Start by cloning the repository of your Vite React app from your version control system (e.g., Git).

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies:** Use yarn to install the project dependencies.

   ```bash
      yarn install
   ```

3. **Start Dev server:** Use npm to install the project dependencies.

   ```bash
      yarn dev
   ```

   This command will compile and bundle your app and start a local development server. It will provide you with a URL to access your app in a web browser (usually http://localhost:5173).

I have meticulously designed an optimal folder structure to enhance organization, and to minimize API requests, I've strategically employed separate states for exhibiting lists versus search outcomes. To streamline authentication headers and the base URL, I've established an Axios instance, mitigating the need for repetitive token and base URL submissions.

Given additional time, I would prioritize the implementation of error handling mechanisms and a dedicated 404 page. This augmentation would undoubtedly elevate the platform's user experience.