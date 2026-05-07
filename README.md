# Expense Tracker System with Recommendations

**This is NOT another LLM-dependent project.** It is a full system for tracking your expenses, switching between different financial modes and getting smart suggestions based on those modes, your expenses and income.


---


## Stack

This is the usual Nextjs TailwindCSS combo, AND the setup is simple enough to run on vercel for free. The free tier should be able to support approximately 7-8 people using the tracker simultaneously, enough for a demo.

- Nextjs (with typescript ofcourse, we hate js)
- TailwindCSS
- Browser local storage
- Algorithms for recommendations


### A few thoughts on this

The typescript, Nextjs, Tailwind selection is obvious. As for the local storage, we didn't want to bother setting up a database for a deadend lab. 

The states for the variables are tracked using hooks, which update the states in the localStorage as well. Utilities for handling localStorage are in `lib/storage/`.


---


## Implementation of Requirements

These system requirements were given by our lab engineer.

### Database

Using a database doesn't make sense for this task. For instance, we can setup postgres through supabase which has a generous free tier, but it would introduce **unnecessary latency** into the system. Not to mention it would also require us to setup user accounts and auth to protect the database while this project is deployed.

For these reasons above, we have used proxy pattern. A module **storage** in `lib/storage/` mimics the usage of a real database and actually stores the data in browser localStorage.

### AI Use

Again, using a free tier api is feasible here. But what would be more interesting and challenging would be to design our own algorithms as discussed in the **Categorization & Recommendations** section bellow.

### Categorization & Recommendations

We have used keyword-matching intelligent algorithms for these. More details will be added here soon.


---


## Developer Setup

It's the usual clone the repo and run, the commands will be these:

- Clone the repository:

```bash
git clone https://github.com/ShahzaibAhmad05/ExpenseRec.git
```

- Move into the cloned directory:

```bash
cd ExpenseRec
```

- Install dependencies:

```bash
npm i
```

- Run on localhost:

```bash
npm run dev
```

That's basically it. Open [http://localhost:3000]() in your browser to see the web app running. The setup should be approximately the same on linux distros. If you encounter any problems, feel free to email us.


---


## Developed & Documented by

[Shahzaib Ahmad](https://github.com/ShahzaibAhmad05)
[Hanzila Nawaz](https://github.com/Hanzila-Nawazz)

