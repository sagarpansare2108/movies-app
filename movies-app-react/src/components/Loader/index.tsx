import styles from './style.module.scss';

const Loader: React.FC = () => {
  return (
    <div className={styles.loader}>
        <span className='loading loading-ring loading-lg'></span>
    </div>
  );
};

export default Loader;
