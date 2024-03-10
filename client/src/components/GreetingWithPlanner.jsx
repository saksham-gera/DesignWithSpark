import React from 'react'
import GreetingBox from './GreetingBox'

export default function GreetingWithPlanner() {
    return (
        <div className=' flex w-3/5 justify-between items-center'>
            <GreetingBox name="Trial Account" />
            <div className="flex w-2/5 ">
                <select class="form-select w-2/5 text-sm m-2" aria-label="Default select example">
                    <option value="1" selected>This Week</option>
                    <option value="2">Previous Week</option>
                    <option value="3">This Month</option>
                </select>
                <button className="btn btn-sm btn-primary text-md m-2">Show Sales</button>
            </div>

        </div>
    )
}
