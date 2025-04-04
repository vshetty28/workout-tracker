import React from 'react'

const SortButton = ({name, text, sort, handleChangeSort, order}) => {
  return (
		<div className={`flex flex-row justify-items text-xs lg:text-base items-center gap-1 ${sort === name ? "text-primary" : ""}`}>
			<button name={name} onClick={handleChangeSort}>
				{text}
			</button>
			<label className={`swap ${sort === name ? "" : "hidden"} ${order === "ASC" ? "swap-active" : ""}`}>
				<div className="swap-on">&uarr;</div>
				<div className="swap-off">&darr;</div>
			</label>
		</div>
	);
}

export default SortButton