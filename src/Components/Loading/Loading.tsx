import './Loading.css'

const Loading = () => {
  return (
    <div className='container text-center'>
      <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading