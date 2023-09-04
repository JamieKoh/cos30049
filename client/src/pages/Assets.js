import React from 'react'

function Assets() {

  const AssetsList = [{id: 1, asset: "Video", value: 22}, {id: 2, asset: "Images", value: 500}, {id: 3, asset: "Bitcoin", value: 342}];

  return (
    <div className='AssetsPageContainer'>
      <p>testing assets page</p>
      <div className='assets_list_container'>
        {AssetsList.map(item => (
          <div className='assets_list_item'>
            <div className='assets_name'>
              <p key={item.id}>{item.asset}</p>
            </div>
            <div className='assets_value'>
              <p key={item.id}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Assets
