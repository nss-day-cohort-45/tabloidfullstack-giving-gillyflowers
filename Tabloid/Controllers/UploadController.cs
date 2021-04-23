﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        [HttpPost, DisableRequestSizeLimit]

        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("client", "public", "uploads");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var inputFileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                    var fileName = String.Concat(inputFileName.Where(c => !Char.IsWhiteSpace(c)));

                    // checking that the file is an image file with one of the valid extensions
                    var fileParts = fileName.Split('.').ToList();
                    fileParts.Reverse();
                    if (fileParts[0].ToLower() != "png" && fileParts[0].ToLower() != "jpg" 
                        && fileParts[0].ToLower() != "gif" && fileParts[0].ToLower() != "bmp")
                    {
                        return BadRequest();
                    }

                    var fullPath = Path.Combine(pathToSave, fileName);

                    if (System.IO.File.Exists(fullPath))
                    {
                        throw new Exception("File already exists");
                    }

                    var outputPath = Path.Combine(folderName, fileName);

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);

                        return Ok(new { outputPath });
                    }
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}