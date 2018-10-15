// import React,{Component} from 'react'


// class CustomTooltip extends Component {
//     constructor(props){
//         super(props);
//     }
//     render() {
//         console.log('props are', this.props);
//         const { active } = this.props;
//         const { payload, label } = this.props;
//         if (active && payload!=null && payload[0]!=null) {
        
//             return (
//                 <div className="custom-tooltip">
//                     {/* <p className="label">{`${label} : ${payload[0].value}`}</p>
//                     <p className="intro">{this.getIntroOfPage(label)}</p> */}
//                     <p>{payload[0].name}</p>
//                     <p>{payload[0].value}</p>
//                 </div>
//             );
//         } else {
//             return null;
//         }   
//     }
// }

// export default CustomTooltip;