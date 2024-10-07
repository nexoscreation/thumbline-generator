import { getAllPosts } from './api/posts';
import styles from '../styles/index.module.css';

interface HomeProps {
	posts: Array<{
		slug: string;
		title: string;
	}>;
}

export default function Home(props: HomeProps) {
	return (
		<div className={styles.main}>
			<section className={styles.hero}>
				<h1 className={styles.title}>Serverless Thumb Generator</h1>
				<p className={styles.subtitle}>
					Create stunning thumbnails (og-images) on the go with our easy-to-use serverless solution.
				</p>
				<a className={styles.ctaButton} href="https://github.com/nexoscreation/thumbline-generator">
					Check GitHub Docs
				</a>
			</section>

			<section className={styles.demoSection}>
				<h2>How it works:</h2>
				<img
					src="/api/thumbnail.png?title=Hello%20Word"
					alt="Sample Thumbnail"
					className={styles.thumbnailPreview}
				/>
				<p>
					Generate your own thumbnails by passing parameters to the API. For example:
				</p>
				<code className={styles.code}>
					https://thumbline-generator.vercel.app/api/thumbnail.png?title=Your%20Title&bg=hexcolor
				</code>
			</section>

			<footer className={styles.footer}>
				<p>Built with ❤️ by NexosCreation. View the full source on{' '}
					<a href="https://github.com/nexoscreation/thumbline-generator">GitHub</a>.
				</p>
			</footer>
		</div>
	);
}

export async function getStaticProps() {
	const allPosts = await getAllPosts();

	return {
		props: { 
			posts: allPosts
		}
	};
}
