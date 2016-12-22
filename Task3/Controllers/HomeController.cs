using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Task3.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.IO;
using System.Text.RegularExpressions;

namespace Task3.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        /*[HttpPost]
        public ActionResult CreateFile(string name)
        {
            Models.File file = new Models.File { Name = name, Content = "", Path = @"C:\Codes\Task3\" + name + ".txt" };
            FileStream fs = System.IO.File.Create(file.Path);
            fs.Close();
            db.Files.Add(file);
            db.SaveChanges();
            return Json(file);
        }*/

        [HttpGet]
        public ActionResult Open(string path)
        {
            if (path == null)
                return HttpNotFound();
            try
            {
                FileModel curFile;
                using (StreamReader sr = new StreamReader(path))
                {
                    Match match = new Regex(@"\w+.txt$").Match(path);
                    string name = match.Groups[0].Value.Substring(0, match.Groups[0].Value.Length - 4);
                    curFile = new FileModel { Name = name, Path = path, Content = sr.ReadToEnd() };
                }
                return Json(curFile, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {
                return HttpNotFound();
            }
        }

        [HttpPost]
        public ActionResult Save(FileModel curFile)
        {
            var a = Json(curFile);
            try
            {
                using (StreamWriter sw = new StreamWriter(curFile.Path))
                {
                    sw.Write(curFile.Content);
                    return Json(true);
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        [HttpPost]
        public ActionResult Create(FileModel curFile)
        {
            if (curFile.Path == null)
                return HttpNotFound();
            try
            {
                System.IO.File.WriteAllText(curFile.Path, "");
                Match match = new Regex(@"\w+.txt$").Match(curFile.Path);
                curFile.Name = match.Groups[0].Value.Substring(0, match.Groups[0].Value.Length - 4);
                return Json(curFile);
            }
            catch (Exception)
            {
                return HttpNotFound();
            }
        }
    }
}