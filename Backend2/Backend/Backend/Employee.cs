using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Data;

namespace Backend
{
    public static class Employee
    {
        [FunctionName("Employee")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            switch (req.Method.ToString())
            {
                case "GET":
                    {
                        Models.Employee e                               = new Models.Employee();
                        try
                        {
                            //e                                           = DAL.GetEmployeeByID("333");
                        }
                        catch (Exception exError)
                        {




                        }

                        return new JsonResult(e);
                    }
                case "POST":
                    {
                        //try
                        //{
                        //    string strBody = await new StreamReader(req.Body).ReadToEndAsync();
                        //    Models.Bike bk = JsonConvert.DeserializeObject<Models.Bike>(strBody);

                        //    if (bk.ID == null || bk.ID == string.Empty)
                        //    {
                        //        bk.ID = Guid.NewGuid().ToString();
                        //        await DAL.CreateBikeAsync(bk);
                        //    }
                        //    else
                        //        await DAL.SaveBikeAsync(bk);
                        //}
                        //catch (Exception exError)
                        //{
                        //    return new StatusCodeResult(500);
                        //}

                        break;
                    }
            }

            return new OkResult();
        }
    }
}
