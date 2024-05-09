import style from './Loading.module.css';
import gif from '../../assets/LoadingGIF.gif';


export default function Loading(props: {
  show: boolean
}) {
  const { show } = props;
  return (
    <div
      className={style.container}
      style={{
        display: show ? 'flex' : 'none'
      }}
    >
      <img src={gif} className={style.gif} />
    </div>
  )
}
