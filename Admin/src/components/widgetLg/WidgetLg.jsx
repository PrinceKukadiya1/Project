import React from 'react'
import './widgetLg.css'
import avatar from '../../assets/avatar.png'


const WidgetLg = () => {

  const Button = ({type}) => {
    return <button className={'widgetLgButton ' + type}>{type}</button>
  }
  return (
    <div className='widgetLg'>
      <h3 className="widgetLgTitle">Latest Transaction</h3>
      <table className="widgetLgTable">
        <tbody>
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>

        <tr className='widgetLgTr'>
          <td className='widgetLgUser'>
            <img src={avatar} alt="" className='widgetLgImage' />
            <span className="widgetLgName">Sushil Carol</span>
          </td>

          <td className="widgetLgDate">2 Jun 2025</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus"><Button type="Approved"/></td>
        </tr>
        
        <tr className='widgetLgTr'>
          <td className='widgetLgUser'>
            <img src={avatar} alt="" className='widgetLgImage' />
            <span className="widgetLgName">Sushil Carol</span>
          </td>

          <td className="widgetLgDate">2 Jun 2025</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus"><Button type="Decliend"/></td>
        </tr>
        
        <tr className='widgetLgTr'>
          <td className='widgetLgUser'>
            <img src={avatar} alt="" className='widgetLgImage' />
            <span className="widgetLgName">Sushil Carol</span>
          </td>

          <td className="widgetLgDate">2 Jun 2025</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus"><Button type="Pending"/></td>
        </tr>
        
        <tr className='widgetLgTr'>
          <td className='widgetLgUser'>
            <img src={avatar} alt="" className='widgetLgImage' />
            <span className="widgetLgName">Sushil Carol</span>
          </td>

          <td className="widgetLgDate">2 Jun 2025</td>
          <td className="widgetLgAmount">$122.00</td>
          <td className="widgetLgStatus"><Button type="Approved"/></td>
        </tr>
        
        </tbody>
      </table>
    </div>
  )
}

export default WidgetLg
