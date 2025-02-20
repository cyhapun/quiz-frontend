import './style.scss';

const Home = () => {
 
    return (
        <div className="homePage">
            <header className="homePage__header">
                <h1>Welcome to Web Programming Quiz</h1>
                <p>Test your frontend web development skills with our interactive quizzes.</p>
            </header>
            <section className="homePage__about">
                <h2>About the Website</h2>
                <p>
                This website offers a variety of quizzes designed to improve your knowledge of
                frontend web technologies. Whether you're learning HTML, CSS, JavaScript, or React, 
                we have challenges to help you learn and grow.
                </p>
        </section>
        </div>
    );
};

export default Home;
