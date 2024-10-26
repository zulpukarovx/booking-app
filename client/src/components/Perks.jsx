
const Perks = ({selected, onChange}) => {
  return (
    <>
        <label htmlFor="wifi" 
            className="border p-4 rounded-lg flex items-center gap-3 text-sm cursor-pointer
            hover:shadow-md duration-200 transition-all">
            <input type="checkbox" id="wifi"/>
            <span>Wifi</span>
        </label>
        <label htmlFor="parking" 
            className="border p-4 rounded-lg flex items-center gap-3 text-sm cursor-pointer
            hover:shadow-md duration-200 transition-all">
            <input type="checkbox" id="parking" />
            <span>Free parking</span>
        </label>
        <label htmlFor="tv" 
            className="border p-4 rounded-lg flex items-center gap-3 text-sm cursor-pointer
            hover:shadow-md duration-200 transition-all">
            <input type="checkbox" id="tv" />
            <span>TV</span>
        </label>
        <label htmlFor="pets" 
            className="border p-4 rounded-lg flex items-center gap-3 text-sm cursor-pointer
            hover:shadow-md duration-200 transition-all">
            <input type="checkbox" id="pets" />
            <span>Pets</span>
        </label>
        <label htmlFor="view" 
            className="border p-4 rounded-lg flex items-center gap-3 text-sm cursor-pointer
            hover:shadow-md duration-200 transition-all">
            <input type="checkbox" id="view" />
            <span>Awesome view</span>
        </label>
        <label htmlFor="charger" 
            className="border p-4 rounded-lg flex items-center gap-3 text-sm cursor-pointer
            hover:shadow-md duration-200 transition-all">
            <input type="checkbox" id="charger" />
            <span>EV charger</span>
        </label>
    </>
  )
}

export default Perks