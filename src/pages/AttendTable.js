import moment from 'moment'
import React, { Component } from 'react'
import { jsPDF } from "jspdf";
import html2pdf from 'html2pdf.js'

export default class AttendTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            // data: [],
            client: 'attendance'
        }
      }

    handleDownload = () => {
        
        const content = document.getElementById('conversation_table');
            if (!content) {
            return;
            }
        let doc = new jsPDF('landscape', 'pt', 'a2');
            
            const opt = {
              margin: [5, 0, 8, 0],
              filename: `${this.state.client}-${moment().format(
                'DD.MMM.YYYY',
              )}.pdf`,
              enableLinks: true,
              pagebreak: {
                avoid: ['tr'],
                mode: ['css', 'legacy'],
              },
              image: { type: 'jpeg', quality: 1 },
              html2canvas: {
                allowTaint: true,
                dpi: 300,
                letterRendering: true,
                logging: false,
                scale: 2,
                scrollX: 0,
                scrollY: 0,
                // onclone: d=>console.log("Dom cloned: ",d)
              },
              jsPDF: {
                orientation: 'landscape',
                unit: 'pt',
                format: 'a2', },
            };
            
            html2pdf()
              .from(content)
              .set(opt)
              .toPdf()
              .get('pdf')
              .then((pdf) => {
                const totalPages = pdf.internal.getNumberOfPages();
            
                for (let i = 1; i < totalPages + 1; i++) {
                  pdf.setPage(i);
                  pdf.setFontSize(8);
                  pdf.text(
                    `${i}/${totalPages}`,
                    pdf.internal.pageSize.getWidth() - 10,
                    pdf.internal.pageSize.getHeight() - 5,
                  );
                }
              })
              .save();
            // }
    }

    render() {
        return (<>
            <div id="conversation_table">
                 <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                Name
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                Matric Number
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                Level
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                Date
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                Time In
                            </th>
                            <th
                                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                Time Out
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.data.map(item => {
                            return this.props.ins?.find(it => parseInt(it.sid) === item.student_id) ? <>
                            <tr key={item.id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <div className="flex items-center">
                                        <div className="ml-3">
                                            <p className="text-gray-900 whitespace-no-wrap">
                                                {item.name}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    {item.matric_no}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    {item.level}
                                    </p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    {moment(this.props.ins?.find(it => parseInt(it.sid) === item.student_id)?.created_at).format('MMM Do YY')}
                                    </p>
                                </td>                              
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    {this.props.ins?.find(it => parseInt(it.sid) === item.student_id)?.time_in || 'NA'}
                                    </p>
                                </td>                              
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                    {this.props.outs?.find(it => parseInt(it.sid) === item.student_id)?.time_out || 'NA'}
                                    </p>
                                </td>                              
                            </tr>
                            </> : null
                         })}
                    </tbody>
                </table>
            </div>
        </div>
            </div>
            <div className="flex p-3 justify-center">
                <button
                    className="mr-3 bg-blue-900 text-white uppercase active:bg-blue-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md hover:bg-blue-800 outline-none focus:outline-none mb-1 x" type="button" 
                    style={{ transition: "all .15s ease" }}
                    onClick={this.handleDownload}
                    >
                    Download Report
                </button>
            </div>
            </>
        )
    }
}
