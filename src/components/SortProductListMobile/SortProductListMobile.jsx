import { Dropdown } from 'flowbite-react'
import { omit } from 'lodash'
import PropTypes from 'prop-types'
import { createSearchParams, useNavigate } from 'react-router-dom'

function SortProductListMobile({ pathname, queryParamsConfig }) {
  const navigate = useNavigate()
  const handleOrderBy = (sort_type, order_by) => {
    navigate({
      pathname: pathname,
      search: createSearchParams({
        ...queryParamsConfig,
        sort: sort_type,
        order: order_by
      }).toString()
    })
  }

  const handleRemoveFilter = () => {
    navigate({
      pathname: pathname,
      search: createSearchParams(omit(queryParamsConfig, ['sort', 'order'])).toString()
    })
  }

  return (
    <Dropdown label='Sắp xếp' inline>
      <Dropdown.Item onClick={() => handleOrderBy('createdAt', 'old')}>Mặc định</Dropdown.Item>
      <Dropdown.Item onClick={() => handleOrderBy('createdAt', 'new')}>Hàng mới nhất</Dropdown.Item>
      <Dropdown.Item onClick={() => handleOrderBy('price', 'asc')}>Giá thấp đến cao</Dropdown.Item>
      <Dropdown.Item onClick={() => handleOrderBy('price', 'desc')}>Giá cao đến thấp</Dropdown.Item>
      {queryParamsConfig.sort && queryParamsConfig.order && (
        <Dropdown.Item onClick={handleRemoveFilter}>Bỏ lọc</Dropdown.Item>
      )}
    </Dropdown>
  )
}

SortProductListMobile.propTypes = {
  pathname: PropTypes.string,
  queryParamsConfig: PropTypes.object
}

export default SortProductListMobile
