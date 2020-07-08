using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Backend
{
    public static class Search
    {
        [FunctionName("Search")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string strQuery = req.Query["Query"];
            List<Models.Employee> ae = new List<Models.Employee>();
            ae.Add(new Models.Employee { first_name = "Don", last_name = "Gould" });
            ae.Add(new Models.Employee { first_name = "Dan", last_name = "Biscup" });
            ae.Add(new Models.Employee { first_name = "Amy", last_name = "Biscup" });
            return new JsonResult(ae.ToArray());
        }
    }
}
