# Frontend

The user writes the id in the search section, the id is processed with formik, the axios request is made, the response is saved in the localstorage, the id sessionStorage. Also, there is a redirect to the leaderboards page through the react router useNavigate hook.**(react-router,axios,tailwindcss,formik)**

Here, users are presented in a table according to their rank via react-table. Among the table features;**(react-table,tailwindcss,bootstrap)**

- Number of people to show
- Quick search for the desired page
- Which page we are on and Total Number of Pages
- Goes to the last page
- Goes backwards
- Goes forward
- Goes to the first page

Table Columns;

- Rank
- Username
- Score
- Country
- Diffrence

When the page is renewed, if there is a change in the ranks of the users in the Top 100, this will be represented as green, yellow, red.

Deployed on Netlify

[Link is here <<<<<<](https://eloquent-pare-22448b.netlify.app/)
