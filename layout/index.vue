<template>
    <div>
        <header>
            <nav>
                <h1>Serverless Thumbnail Generator</h1>
                <Nuxtlink to="/">Home</Nuxtlink>
                <Nuxtlink to="/editor">Editor</Nuxtlink>
                <Nuxtlink to="/docs">Documation</Nuxtlink>
            </nav>
        </header>

        <main>
            <slot />
        </main>

        <footer>
            <p>
                Built with ❤️ by NexosCreation. View the full source on
                <a href="https://github.com/nexoscreation/thumbline-generator"> GitHub</a>.
            </p>
        </footer>
    </div>
</template>

<script setup>
</script>

<style scoped>
    header {
        background: #333;
        color: #fff;
        padding: 1rem;
        text-align: center;
    }

    nav {
        margin: 0 auto;
    }

    nav h1 {
        margin-bottom: 0.5rem;
    }

    nav a {
        color: #fff;
        text-decoration: none;
        margin: 0 1rem;
    }

    main {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        margin-top: 10rem;
        padding: 2rem;
        text-align: center;
    }

    footer {
        margin-top: 3rem;
        color: #777;
        text-align: center;
        padding: 1rem;
        background: #f1f1f1;
        position: relative;
    }
</style>