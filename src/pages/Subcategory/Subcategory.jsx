import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { Pagination } from 'flowbite-react'
import { useEffect } from 'react'
import { Link, createSearchParams, useNavigate, useParams } from 'react-router-dom'
import { getAllVersionsBySubcategoryId } from '~/apis/versions.api'
import FilterDropdown from '~/components/FilterDropdown'
import ProductItem from '~/components/ProductItem'
import SortProductList from '~/components/SortProductList'
import { cpuOptions, memoryOptions, priceOptions, ramOptions, screenSizeOptions, vgaOptions } from '~/constants/options'
import useQueryParamsConfig from '~/hooks/useQueryParamsConfig'

function Subcategory({ setProgress }) {
  const { subcategoryId } = useParams()
  const navigate = useNavigate()
  const queryParamsConfig = useQueryParamsConfig()
  const { data } = useQuery({
    queryKey: ['versions-by-subcategory', subcategoryId, queryParamsConfig],
    queryFn: () => getAllVersionsBySubcategoryId(subcategoryId, queryParamsConfig),
    placeholderData: keepPreviousData
  })

  const versions = data?.data?.data?.docs || []

  useEffect(() => {
    setProgress(20)
    setTimeout(() => {
      setProgress(100)
    }, 200)
  }, [setProgress])

  const onPageChange = (page) => {
    navigate({
      pathname: `/subcategory/${subcategoryId}`,
      search: createSearchParams({
        ...queryParamsConfig,
        page
      }).toString()
    })
  }
  return (
    <div className='max-w-[1400px] mx-auto mt-5 mb-20 p-6'>
      <div className='flex justify-between'>
        <h2 className='text-3xl font-bold uppercase'>Laptop Dell</h2>
        <nav className='flex' aria-label='Breadcrumb'>
          <ol className='inline-flex items-center space-x-1 md:space-x-3'>
            <li className='cursor-pointer inline-flex items-center opacity-60'>
              <Link to='/' className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600'>
                <svg
                  className='w-3 h-3 mr-2.5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z' />
                </svg>
                Trang chủ
              </Link>
            </li>
            <li className='cursor-pointer opacity-60'>
              <div className='flex items-center'>
                <svg
                  className='w-3 h-3 text-gray-400 mx-1'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 6 10'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 9 4-4-4-4'
                  />
                </svg>
                <div className='ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2'>Sản phẩm</div>
              </div>
            </li>
            <li className='cursor-pointer' aria-current='page opacity-60'>
              <div className='flex items-center'>
                <svg
                  className='w-3 h-3 text-gray-400 mx-1'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 6 10'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 9 4-4-4-4'
                  />
                </svg>
                <Link to={`/subcategory/${subcategoryId}`} className='ml-1 text-sm text-gray-500 md:ml-2'>
                  Laptop Dell
                </Link>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className='grid grid-cols-12 gap-8 mt-10'>
        <div className='col-span-2'>
          <div className='border border-gray-300 px-3 py-5 rounded-lg'>
            <h3 className='text-xl font-semibold mb-4'>Lọc sản phẩm</h3>
            <FilterDropdown title='Khoảng giá' options={priceOptions} queryParamsConfig={queryParamsConfig} />
            <FilterDropdown
              title='Kích thước màn hình'
              options={screenSizeOptions}
              queryParamsConfig={queryParamsConfig}
            />
            <FilterDropdown title='RAM' options={ramOptions} queryParamsConfig={queryParamsConfig} />
            <FilterDropdown title='Bộ nhớ trong' options={memoryOptions} queryParamsConfig={queryParamsConfig} />
            <FilterDropdown title='CPU' options={cpuOptions} queryParamsConfig={queryParamsConfig} />
            <FilterDropdown title='Card màn hình' options={vgaOptions} queryParamsConfig={queryParamsConfig} />
          </div>
        </div>
        <div className='col-span-10'>
          <SortProductList pathname={`/subcategory/${subcategoryId}`} queryParamsConfig={queryParamsConfig} />
          <div className='grid grid-cols-4 gap-3 p-6 mb-10'>
            {versions.map((version) => (
              <ProductItem key={version._id} version={version} isHover />
            ))}
          </div>
          {data?.data?.data.totalPages > 1 && (
            <div className='flex overflow-x-auto sm:justify-center mt-10'>
              <Pagination
                className='text-sm'
                currentPage={queryParamsConfig.page}
                totalPages={data?.data?.data.totalPages}
                onPageChange={onPageChange}
                previousLabel='Trang trước'
                nextLabel='Trang sau'
              />
            </div>
          )}
          {versions.length === 0 && <div className='mt-10 text-lg font-bold text-center'>Không có sản phẩm nào</div>}
        </div>
      </div>
    </div>
  )
}

export default Subcategory
