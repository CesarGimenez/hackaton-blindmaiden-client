
const Products = () => {
  return (
    <div className='flex flex-col w-full px-5 mt-10 py-10 bg-white h-[90vh]'>
      <div className='overflow-x-auto'>
        <h1 className='text-2xl font-semibold mb-5'>Listado de productos</h1>
        <button className='bg-emerald-600 text-white p-2 rounded-lg mb-10'>Ingresar nuevo</button>
        <table className='table-auto w-full'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Nombre</th>
              <th className='px-4 py-2'>Codigo</th>
              <th className='px-4 py-2'>Precio de Venta</th>
              <th className='px-4 py-2'>Precio de Compra</th>
              <th className='px-4 py-2'>Cantidad por Bulto</th>
              <th className='px-4 py-2'>Stock</th>
              <th className='px-4 py-2'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border px-4 py-2'>Pepsi Cola</td>
              <td className='border px-4 py-2'>123456789</td>
              <td className='border px-4 py-2'>$1.50</td>
              <td className='border px-4 py-2'>$1.00</td>
              <td className='border px-4 py-2'>12</td>
              <td className='border px-4 py-2'>100</td>
              <td className='border px-4 py-2'>
                <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full'>
                  Editar
                </button>
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full'>
                  Eliminar
                </button>
              </td>
            </tr>
            <tr>
              <td className='border px-4 py-2'>Fanta</td>
              <td className='border px-4 py-2'>987654321</td>
              <td className='border px-4 py-2'>$1.00</td>
              <td className='border px-4 py-2'>$0.80</td>
              <td className='border px-4 py-2'>24</td>
              <td className='border px-4 py-2'>50</td>
              <td className='border px-4 py-2 flex justify-center'>
                <button className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full'>
                  Editar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='flex justify-center items-center pt-4'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
          Anterior
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
          1
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
          2
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
          3
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
          4
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default Products
