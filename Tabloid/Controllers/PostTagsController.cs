using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagsController : ControllerBase
    {
        private readonly IPostTagRepository _postTagRepository;

        public PostTagsController(IPostTagRepository postTagRepository)
        {
            _postTagRepository = postTagRepository;
        }

        [HttpGet("{postId}")]
        public IActionResult GetAllPostTagsByPostId(int postId)
        {
            var tags = _postTagRepository.GetAllPostTagsByPostId(postId);
            if (tags == null)
            {
                return NotFound();
            }
            return Ok(tags);
        }

        [HttpPost]
        public IActionResult AddPostTag(PostTag postTag)
        {
            _postTagRepository.AddPostTag(postTag);
            return CreatedAtAction("Get", new { id = postTag.Id }, postTag);
        }

        [HttpDelete("{postId}")]
        public IActionResult Delete(int postId)
        {
            _postTagRepository.DeletePostTag(postId);
            return NoContent();
        }
    }
}
