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

        // Needs to accept a list of tag ids, it can use to make the new entries
        // with the tagId and postId
        [HttpPost("{postId}")]
        public IActionResult UpdatePostTags(List<int> tagIds, int postId)
        {
                _postTagRepository.DeletePostTag(postId);

            foreach (int tagId in tagIds)
            {
                _postTagRepository.AddPostTag(tagId, postId);
            }

            return NoContent();
        }


        //[HttpPost]
        //public IActionResult AddPostTag(int tagId, int postId)
        //{
        //    var OldPostTags = _postTagRepository.GetAllPostTagsByPostId(postId);

        //    foreach (var postTag in OldPostTags)
        //    {
        //        _postTagRepository.DeletePostTag(postId);
        //    }

        //    _postTagRepository.AddPostTag(tagId, postId);
     
        //    return NoContent();
        //}

        //[HttpDelete("{postId}")]
        //public IActionResult DeletePostTag(int postId)
        //{
        //    var OldPostTags = _postTagRepository.GetAllPostTagsByPostId(postId);

        //    foreach (var postTag in OldPostTags)
        //    {
        //        _postTagRepository.DeletePostTag(postId);
        //    }
        //    return NoContent();
        //}
    }
}
