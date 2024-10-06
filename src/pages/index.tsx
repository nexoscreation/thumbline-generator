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
			<h1>Serverless Thumb Generator</h1>
			<p>This is a Thumbnail (or og-image) generator, use it wisely</p>

			<p>
				Check how to use it and docs on:{' '}
				<a href="https://github.com/luk3skyw4lker/thumbnail-generator">
					the GitHub repository
				</a>
			</p>
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
