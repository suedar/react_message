import './App.css';
import toast from "./messgae";

function App() {
  const handleClick = ()=>{
		toast.info('我是全局提示组件info'); // 其他提示类型都按照此方式即可。
	}

  const handleClick1 = ()=>{
		toast.warning('我是全局提示组件warning');
	}

  const handleClick2 = ()=>{
		toast.error('我是全局提示组件error');
	}

  const handleClick3 = ()=>{
		toast.success('我是全局提示组件success');
	}

  const handleClick4 = ()=>{
		toast.success('我是全局提示组件success, 延迟5s', 5000);
	}
	
  return (
    <div className="App">
			<button onClick={handleClick}>info</button>
			<button onClick={handleClick1}>warning</button>
			<button onClick={handleClick2}>error</button>
			<button onClick={handleClick3}>success</button>
			<button onClick={handleClick4}>success， 延迟</button>
    </div>
  );
}

export default App;
