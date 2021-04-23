using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UploadController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpPost, DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            try
            {
                var currentUser = GetCurrentUserProfile();
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("client", "public", "uploads");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var inputFileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                    var fileName = String.Concat(inputFileName.Where(c => !Char.IsWhiteSpace(c)));

                    // checking that the file is an image file with one of the valid extensions
                    var extensions = new[] {"png", "jpg", "gif", "bmp"};
                    var fileParts = fileName.Split('.').ToList();
                    fileParts.Reverse();                    
                    if (!extensions.Contains(fileParts[0].ToLower()))
                    {
                        return BadRequest();
                    }

                    Int32 unixTimestamp = (Int32)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds;

                    string randomFileName = currentUser.Id + "-" + unixTimestamp.ToString() + "." + fileParts[0].ToLower();

                    var fullPath = Path.Combine(pathToSave, randomFileName);

                    if (System.IO.File.Exists(fullPath))
                    {
                        throw new Exception("File already exists");
                    }

                    var outputPath = Path.Combine(folderName, randomFileName);

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

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
