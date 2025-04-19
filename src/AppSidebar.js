import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav} from '@coreui/react'
 
import { AppSidebarNav } from './AppSidebarNav'
 
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { Navigation } from '@coreui/coreui'

// sidebar nav config
 
const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
       </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar >
          <AppSidebarNav items={Navigation} />
        </SimpleBar>
      </CSidebarNav>

    </CSidebar>
  )
}

export default React.memo(AppSidebar)
