class Board extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			squares: this.props.squares,
			prevClickNum: -1,
			classname: Array(12).fill('square'),
			success: 0
		};

	}
	handleRest(){
	
			let backcolor1 = [],
			backcolor2 = [];
		for(let i = 0; i <this.props.squares.length; i++) {
			if(Math.random() >= 0.5) {

				backcolor1.push(this.props.squares[i]);
			} else {
				backcolor2.push(this.props.squares[i]);

			}
		}
		this.copybg = [...backcolor1, ...backcolor2];
	
	this.setState ({
			squares:this.copybg,
			classname: Array(12).fill('square'),
		});
}

	handleClick(i) {
		const squares = this.state.squares.slice();
		const classname = this.state.classname.slice();

		if(classname[i] !== 'square show success') {

			//点击翻转卡片
			classname[i] = 'square show'
			//记录首次点击的卡片 //再次点击同一张卡片
			if(this.state.prevClickNum === -1 || this.state.prevClickNum === i) {
				this.props.resault(0);
				this.state.prevClickNum = i;
			}
			//点击不同的卡片
			else if(this.state.prevClickNum !== i) {

				this.props.resault(0);
				//上次点击与当前点击为同色成功
				if(squares[this.state.prevClickNum] === squares[i]) {

					squares[this.state.prevClickNum] = squares[i] = 'yellow'
					classname[this.state.prevClickNum] = classname[i] = 'square show success'
					//成功次数
					this.state.success++;

					if(this.state.success === 6) {
						this.props.resault(1);
					} else {
						this.props.resault(2);
					}

					this.state.prevClickNum = -1;
					this.setState({
						prevClickNum: this.state.prevClickNum
					});

				} else {

					this.props.resault(-1);
					//不同色翻回背面
					let that = this;
					setTimeout(function() {

						classname[that.state.prevClickNum] = classname[i] = 'square'

						that.state.prevClickNum = -1;
						that.setState({
							prevClickNum: that.state.prevClickNum,
							classname: classname
						});

						that.props.resault(0);
					}, 500);

				}
			}
		}

		this.setState({
			squares: squares,
			prevClickNum: this.state.prevClickNum,
			classname: classname
		});

	}

	items() {
		return this.state.squares.map((item, i) => (
			<Square  classname={this.state.classname[i]}    bgcolor={item} key={i}   value={this.state.squares[i]} onClick={() => this.handleClick(i)} />
		));
	}

	render() {
		return(
			<div>
			<button className="reset" onClick={()=>this.handleRest()} >重新开始</button>
			<ul className="clear">
			{this.items()}
			</ul>
			</div>
		)
	}
}
export default Board;