using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using Models;

namespace Backend
{
    public class DAL
    {
        public const string SQL_CONNECTION                              = "connectionstring";
        private static SqlConnection m_sqlClient                        = new SqlConnection(DAL.SQL_CONNECTION);


        public static Models.Employee GetEmployeeByID(string EmployeeID)
        {
            Models.Employee rEmployee                                   = new Models.Employee();
            try
            {
                m_sqlClient.Open();

                using (SqlCommand cmd                                   = new SqlCommand("SELECT top 1 * FROM company", m_sqlClient))
                {
                    SqlDataAdapter da                                   = new SqlDataAdapter(cmd);
                    DataSet ds                                          = new DataSet();
                    da.Fill(ds);

                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        rEmployee.FirstName                             = dr[1].ToString();
                        rEmployee.LastName                              = dr[2].ToString();
                        break;                        
                    }
                }

                m_sqlClient.Close();
            }
            catch (Exception exError) 
            {
                string strError                                         = exError.Message;
            }

            return rEmployee;
        }    
        

    }
}
